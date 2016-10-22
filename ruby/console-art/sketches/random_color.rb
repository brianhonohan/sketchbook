require_relative '../lib/sketch.rb'

class RandomColor < Sketch
  def draw
    row = rand(0..height-1)
    col = rand(0..width-1)
    rand_color = color(rand(255), rand(255), rand(255))
    fill(rand_color)
    print_at(" ", col, row)
  end
end

sketch = RandomColor.new
sketch.run
