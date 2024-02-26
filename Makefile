up:
	docker-compose up --build -d

down:
	docker-compose down

metricbeat:
	docker compose logs metricbeat01

es-live:
	# docker-compose exec api apk add curl
	docker-compose exec api curl --cacert ./ca.crt -u elastic:changeme https://es01:9200
	docker-compose exec api curl -u elastic:changeme https://es01:9200
	# docker-compose exec api node log-pusher.js

api-bash:
	docker-compose exec api bash

