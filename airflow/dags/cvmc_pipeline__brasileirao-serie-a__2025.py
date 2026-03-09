from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta

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
    description=f"Pipeline completo: {LEAGUE} | {SEASON}",
    schedule_interval="0 7 * * *",
    start_date=datetime(2025, 1, 1),
    catchup=False,
    default_args=default_args,
    tags=["cvmc", LEAGUE, SEASON],
) as dag:

    scraper = BashOperator(
        task_id="scraper",
        bash_command=papermill_cmd(
            "scraper/00_scrapper_statshub_data.ipynb",
            {"LEAGUE": LEAGUE, "SEASON": SEASON, "ENVIRONMENT": ENVIRONMENT, "REPROC_MODE": False}
        ),
    )

    raw = BashOperator(
        task_id="raw",
        bash_command=papermill_cmd(
            "transform/01_raw_data.ipynb",
            {"LEAGUE": LEAGUE, "SEASON": SEASON, "ENVIRONMENT": ENVIRONMENT, "REPROC_MODE": False}
        ),
    )

    silver = BashOperator(
        task_id="silver",
        bash_command=papermill_cmd(
            "transform/02_silver_data.ipynb",
            {"LEAGUE": LEAGUE, "SEASON": SEASON, "ENVIRONMENT": ENVIRONMENT, "REPROC_MODE": False}
        ),
    )

    gold = BashOperator(
        task_id="gold",
        bash_command=papermill_cmd(
            "transform/03_gold_data.ipynb",
            {"LEAGUE": LEAGUE, "SEASON": SEASON, "ENVIRONMENT": ENVIRONMENT}
        ),
    )

    scraper >> raw >> silver >> gold