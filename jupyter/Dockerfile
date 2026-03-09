FROM jupyter/pyspark-notebook:latest

USER root

RUN pip install \
    boto3 \
    delta-spark==3.2.0 \
    pyspark==3.5.0 \
    psycopg2-binary \
    pandas \
    sqlalchemy \
    papermill

USER jovyan