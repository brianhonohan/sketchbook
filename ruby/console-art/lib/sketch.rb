require 'terminfo'

# Inspired by Processing (https://processing.org)
class Sketch
  attr_reader :frameCount

  def initialize
    clear
    @target_fps = 30.0
    @frameCount = 0
    setup
  end

  def setup; end
  def draw; end

  def tick
    draw
    @frameCount += 1
    sleep(1 / @target_fps)
  end

  def run
    limit = 100
    while @frameCount < limit
      tick
    end
    puts
    puts
  end

  def width
    TermInfo.screen_width
  end

  def height
    TermInfo.screen_height
  end

  def clear
    TermInfo.control("clear")
  end

  def print_at(str, x, y)
    TermInfo.control('cup', y, x)
    print str
  end
end