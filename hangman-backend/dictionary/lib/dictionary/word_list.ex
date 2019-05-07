defmodule Dictionary.WordList do
  @me __MODULE__

  def start_link() do
    Agent.start_link(&word_list/0, name: @me)
  end

  def random_word() do
    # if :rand.uniform < 0.33 do
    #   Agent.get(@me, fn(_) -> exit(:boom) end)
    # end
    Agent.get(@me, &Enum.random/1)
  end

  def word_list do
    Path.join(:code.priv_dir(:dictionary), "word_list.txt")
    |> File.read!()
    |> String.split(~r/\n/)
  end
end
