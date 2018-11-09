defmodule GallowsWeb.HangmanView do
  use GallowsWeb, :view

  def format_letters(letters) do
    letters |> Enum.join(" ")
  end
end
