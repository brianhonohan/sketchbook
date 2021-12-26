require_relative '../lib/sketch.rb'

class ColorChart < Sketch
  def setup
    @frame_limit = 1
    # @target_fps = 100.0
  end

  def draw
    height.times do |row|
      width.times do |col|
        fill(color_at(row, col, height, width))
        print_at(" ", col, row)
      end
    end
  end

  def color_at(row, col, h, w)
    hue = (1.0 * col) / w
    lightness = (h - row) / (h * 1.0)
    color_hsl(hue, 1, lightness)
  end
end

sketch = ColorChart.new
sketch.run
