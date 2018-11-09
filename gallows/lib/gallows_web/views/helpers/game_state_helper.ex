defmodule Gallows.Views.Helpers.GameStateHelper do
  import Phoenix.HTML, only: [raw: 1]

  @responses %{
    :won => {:success, "You may live another day."},
    :lost => {:danger, "Figures."},
    :good_guess => {:success, "Lucky."},
    :bad_guess => {:warning, "One step closer to your demise."},
    :already_used => {:info, "Your negligence disgusts me."},
    :invalid_guess => {:info, "Your negligence disgusts me."}
  }

  def game_state(state) do
    IO.inspect(state)

    @responses[state]
    |> IO.inspect()
    |> alert()
  end

  defp alert(nil), do: ""

  defp alert({class, message}) do
    """
    <div class="alert alert-#{class}">
    	#{message}
    </div>
    """
    |> raw()
  end
end
