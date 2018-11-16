FROM bitwalker/alpine-elixir-phoenix:latest

RUN mkdir /app
COPY . /app
WORKDIR /app/socket_gallows

EXPOSE 4000
ENV PORT=4000 MIX_ENV=dev

RUN mix deps.get
RUN mix deps.compile --force
RUN mix compile --force

CMD mix phx.server
