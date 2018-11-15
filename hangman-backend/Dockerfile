FROM elixir:1.7.3

RUN mix local.hex --force
RUN mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez --force

RUN curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs

RUN mkdir /app
COPY . /app
WORKDIR /app/socket_gallows

ENV MIX_ENV=dev
ENV PORT=4000


RUN mix local.rebar --force
RUN mix deps.get
RUN mix deps.compile --force
RUN mix compile --force

RUN mix phx.digest
CMD mix phx.server