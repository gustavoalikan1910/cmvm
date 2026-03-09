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

# Download jars necessários
RUN mkdir -p /home/jovyan/.ivy2/jars && \
    wget -q https://repo1.maven.org/maven2/io/delta/delta-spark_2.12/3.2.0/delta-spark_2.12-3.2.0.jar -O /home/jovyan/.ivy2/jars/io.delta_delta-spark_2.12-3.2.0.jar && \
    wget -q https://repo1.maven.org/maven2/io/delta/delta-storage/3.2.0/delta-storage-3.2.0.jar -O /home/jovyan/.ivy2/jars/io.delta_delta-storage-3.2.0.jar && \
    wget -q https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-aws/3.3.4/hadoop-aws-3.3.4.jar -O /home/jovyan/.ivy2/jars/org.apache.hadoop_hadoop-aws-3.3.4.jar && \
    wget -q https://repo1.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/1.12.262/aws-java-sdk-bundle-1.12.262.jar -O /home/jovyan/.ivy2/jars/com.amazonaws_aws-java-sdk-bundle-1.12.262.jar && \
    wget -q https://repo1.maven.org/maven2/org/antlr/antlr4-runtime/4.9.3/antlr4-runtime-4.9.3.jar -O /home/jovyan/.ivy2/jars/org.antlr_antlr4-runtime-4.9.3.jar && \
    wget -q https://repo1.maven.org/maven2/org/wildfly/openssl/wildfly-openssl/1.0.7.Final/wildfly-openssl-1.0.7.Final.jar -O /home/jovyan/.ivy2/jars/org.wildfly.openssl_wildfly-openssl-1.0.7.Final.jar && \
    wget -q https://jdbc.postgresql.org/download/postgresql-42.6.0.jar -O /home/jovyan/.ivy2/jars/org.postgresql_postgresql-42.6.0.jar

# Configura spark-defaults.conf
RUN printf '%s\n' \
    'spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension' \
    'spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog' \
    'spark.jars=/home/jovyan/.ivy2/jars/io.delta_delta-spark_2.12-3.2.0.jar,/home/jovyan/.ivy2/jars/io.delta_delta-storage-3.2.0.jar,/home/jovyan/.ivy2/jars/org.apache.hadoop_hadoop-aws-3.3.4.jar,/home/jovyan/.ivy2/jars/com.amazonaws_aws-java-sdk-bundle-1.12.262.jar,/home/jovyan/.ivy2/jars/org.antlr_antlr4-runtime-4.9.3.jar,/home/jovyan/.ivy2/jars/org.wildfly.openssl_wildfly-openssl-1.0.7.Final.jar,/home/jovyan/.ivy2/jars/org.postgresql_postgresql-42.6.0.jar' \
    > /usr/local/spark/conf/spark-defaults.conf

RUN chown -R jovyan:users /home/jovyan/.ivy2

USER jovyan