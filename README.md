### Redis Setup

`docker network create redis-network`
`docker run -d --network redis-network -v data:/data --name redis redis redis-server`
`docker run -d --network redis-network --name redisinsight -p 5540:5540 redis/redisinsight:latest -v redisinsight:/data`
