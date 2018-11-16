defmodule SocketGallowsWeb.Router do
  use SocketGallowsWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SocketGallowsWeb do
    pipe_through :api
  end
end
