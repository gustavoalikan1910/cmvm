FROM jupyter/pyspark-notebook:latest

USER root

RUN pip install \
    boto3 \
    delta-spark \
    psycopg2-binary \
    pandas \
    sqlalchemy \
    papermill

USER jovyan
