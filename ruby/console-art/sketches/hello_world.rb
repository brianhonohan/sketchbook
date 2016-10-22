require_relative '../lib/sketch.rb'

class HelloWorld < Sketch
  def setup
    @my_string = 'Hello World'
  end

  def draw
    print_at(@my_string, 0, frameCount)
  end
end

sketch = HelloWorld.new
sketch.run
