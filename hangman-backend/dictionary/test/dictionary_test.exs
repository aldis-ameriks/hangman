defmodule DictionaryTest do
  use ExUnit.Case
  alias Dictionary.WordList

  test "word_list returns a list of words" do
    words = WordList.word_list()
    assert words |> Enum.count() > 0
  end

  test "random_word/0 returns a random word" do
    word = WordList.random_word()
    assert String.valid?(word)
    assert String.length(word) > 0
  end
end
