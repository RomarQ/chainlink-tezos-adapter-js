#!/usr/bin/env bash

set -e -o pipefail

usage () {
    cat >&2 <<EOF
usage: $0 <cmd>

where <cmd>:

- 'test': build and test the docker image
- 'push': pushn to a docker-registry

Normal workflow:

    docker login https://docker.pkg.github.com

    ./scripts/make-docker-image.sh test
    ./scripts/make-docker-image.sh push https://docker.pkg.github.com/romarq/chainlink-tezos-adapter-js/chainlink-tezos-adapter:001
EOF
}
do_help () {
    usage
}

base_image=node
make_dockerfile () {
    cat > Dockerfile <<EOF
FROM $base_image

# Copy the sources to the container
COPY . /adapter
WORKDIR /adapter

# Install dependencies
RUN npm i

# Build the adapter
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
EOF

}

do_test () {
    make_dockerfile
    docker build -t "chainlink-tezos-adapter-js:test" .
}
do_push () {
    name="$1"
    if [ "$name" = "" ] ; then
        usage
        exit 2
    fi
    docker tag chainlink-tezos-adapter-js:test "$name"
    docker push "$name"
}

if [ "$1" = "" ] ; then
    usage
else
    do_"$@"
fi
