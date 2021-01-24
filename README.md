docker-compose up --build

docker-compose -f docker-compose.yaml -f docker-compose.development.yaml up --build

 "start": "ng serve --host 0.0.0.0 --port 4200 --disable-host-check",

По дефолту в ангуляре 127.0.0.1 которого нет внутри докера и disable-host-check нужен чтобы иметь возможность использовать любой хост.
