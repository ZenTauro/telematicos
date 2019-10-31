defmodule SmartRoomWeb.UserController do
  use SmartRoomWeb.Web, :controller

  def index(conn, _params) do
    users = []
    json conn, users
  end
end
