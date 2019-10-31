defmodule SmartRoom.Repo do
  use Ecto.Repo,
    otp_app: :smartroom,
    adapter: Ecto.Adapters.Postgres
end
