FROM python:3.10-slim-bookworm

WORKDIR /app
COPY . . 

RUN pip install -r requirements.txt

CMD ["univorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]