defmodule Dictionary do
  defdelegate random_word(), to: Dictionary.WordList
  defdelegate random_word(words), to: Dictionary.WordList
  defdelegate start(), to: Dictionary.WordList, as: :word_list
end
