require_relative '../lib/sketch.rb'

class CascadingHello < Sketch
  def setup
    @my_string = 'Hello World'
  end

  def draw
    fill_background if frameCount % height == 0
    print_at(@my_string, frameCount % height, frameCount % height)
  end
end

sketch = CascadingHello.new
sketch.run
