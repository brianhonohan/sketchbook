require_relative '../lib/sketch.rb'

class StripedString < Sketch
  def setup
    @my_string = 'Lorem ipsum'
    @frame_limit = 100
    @target_fps = 40.0
    stroke( color(255, 0, 0) )
  end

  def draw
    x_offset = (frameCount / height) * "#{@my_string}     ".length
    x_offset = x_offset % width

    rand_color = color(rand(255), rand(255), rand(255))
    stroke( rand_color )
    print_at(@my_string, x_offset + frameCount % height, frameCount % height)
  end
end

sketch = StripedString.new
sketch.run
