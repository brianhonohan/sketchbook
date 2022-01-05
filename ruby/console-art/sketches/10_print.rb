require_relative '../lib/sketch.rb'

class TenPrint < Sketch
  def setup
    @frame_limit = 2000
    @target_fps = 100
    @cursor = 0
  end

  def draw
    stroke(cursor_to_color)

    rand_num = Random.rand(100)
    if rand_num < 70
      print_at("/", cursor_x, cursor_y)
    else
      print_at("\\", cursor_x, cursor_y)
    end
    @cursor += 1
  end

  def cursor_x
    @cursor % width
  end

  def cursor_y
    (@cursor / width).floor % height
  end

  def cursor_to_color
    hue = (1.0 * cursor_y) / height / 1.5
    lightness = 0.5
    color_hsl(hue, 1, lightness)
  end
end

sketch = TenPrint.new
sketch.run
