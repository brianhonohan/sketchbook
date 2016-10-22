require 'terminfo'
require 'tco'
require 'color'

# Inspired by Processing (https://processing.org)
class Sketch
  attr_reader :frameCount, :context

  def initialize
    @target_fps = 30.0
    @frameCount = 0
    @context = self.class.default_context
    @contexts = []
    @contexts << @context
    fill_background
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

  def print_at(string, x, y)
    TermInfo.control('cup', y, x)
    print_with_tco(string)
  end

  def self.default_context
    {
      bg: default_bg_color
    }
  end

  def self.default_bg_color
    Color::RGB.by_hex('#333333')
  end

  def fill_background
    line = " " * width
    TermInfo.control('cup', 0, 0)
    height.times do |row_number|
      print_at(line, 0, row_number)
    end
  end

  private

  def print_with_tco(string)
    string = string.bg("##{context[:bg].hex}") if context[:bg]
    print string
  end
end