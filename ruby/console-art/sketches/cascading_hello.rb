require_relative '../lib/sketch.rb'

class CascadingHello < Sketch
  def setup
    @my_string = 'Hello World'
  end

  def draw
    clear if frameCount % 50 == 0
    print_at(@my_string, frameCount % 50, frameCount % 50)
  end
end

sketch = CascadingHello.new
sketch.run
