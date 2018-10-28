defmodule Dictionary.Dictionary do
  def random_word do
    word_list()
    |> Enum.random()
  end

  defp hello(input) do
    "Hello, #{input}!"
  end

  defp word_list do
    "../../assets/words.txt"
    |> Path.expand(__DIR__)
    |> File.read!()
    |> String.split(~r/\n/)
  end
end
