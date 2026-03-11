from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.models.param import Param  # A classe mágica que obriga a UI a aparecer
from datetime import datetime, timedelta

# Variáveis estáticas de identificação do ficheiro e do container
LEAGUE = "brasileirao-serie-a"
SEASON = "2025"
ENVIRONMENT = "prd"
JUPYTER_CONTAINER = "cvmc-jupyter"
NOTEBOOKS_BASE = "/home/jovyan/work"

default_args = {
    "owner": "cvmc",
    "retries": 0,
    "retry_delay": timedelta(minutes=5),
}

def papermill_cmd(input_nb, params: dict) -> str:
    params_str = " ".join([f"-p {k} {v}" for k, v in params.items()])
    output_nb = input_nb.replace(".ipynb", "_output.ipynb")
    return f"docker exec {JUPYTER_CONTAINER} papermill {NOTEBOOKS_BASE}/{input_nb} {NOTEBOOKS_BASE}/{output_nb} {params_str}"

with DAG(
    dag_id=f"cvmc_pipeline__{LEAGUE}__{SEASON}",
    description=f"Pipeline completo: {LEAGUE} | {SEASON} parametrizado",
    schedule_interval="0 7 * * *",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    default_args=default_args,
    # === BLINDAGEM COM Param PARA FORÇAR A INTERFACE VISUAL ===
    params={
        "league": Param(LEAGUE, type="string", description="Nome da Liga"),
        "season": Param(SEASON, type="string", description="Ano da Temporada"),
        "environment": Param(ENVIRONMENT, type="string", description="Ambiente (dev/prd)"),
        "reproc_mode": Param("False", type="string", description="Forçar reprocessamento total da Raw? (True/False)") 
    },
    tags=["cvmc", LEAGUE, SEASON, "dynamic"],
) as dag:

    scraper = BashOperator(
        task_id="scraper",
        bash_command=papermill_cmd(
            "scraper/00_scrapper_statshub_data.ipynb",
            {
                "LEAGUE": "{{ params.league }}", 
                "SEASON": "{{ params.season }}", 
                "ENVIRONMENT": "{{ params.environment }}", 
                "REPROC_MODE": "{{ params.reproc_mode }}"
            }
        ),
    )

    raw = BashOperator(
        task_id="raw",
        bash_command=papermill_cmd(
            "transform/01_raw_data.ipynb",
            {
                "LEAGUE": "{{ params.league }}", 
                "SEASON": "{{ params.season }}", 
                "ENVIRONMENT": "{{ params.environment }}", 
                "REPROC_MODE": "{{ params.reproc_mode }}"
            }
        ),
    )

    silver = BashOperator(
        task_id="silver",
        bash_command=papermill_cmd(
            "transform/02_silver_data.ipynb",
            {
                "LEAGUE": "{{ params.league }}", 
                "SEASON": "{{ params.season }}", 
                "ENVIRONMENT": "{{ params.environment }}", 
                "REPROC_MODE": "{{ params.reproc_mode }}"
            }
        ),
    )

    gold = BashOperator(
        task_id="gold",
        bash_command=papermill_cmd(
            "transform/03_gold_data.ipynb",
            {
                "LEAGUE": "{{ params.league }}", 
                "SEASON": "{{ params.season }}", 
                "ENVIRONMENT": "{{ params.environment }}"
            }
        ),
    )

    scraper >> raw >> silver >> gold