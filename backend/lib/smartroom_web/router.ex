defmodule SmartRoomWeb.Router do
  use SmartRoomWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api/v1", SmartRoomWeb do
    pipe_through :api

    get "/users", UserController, :index
  end
end
