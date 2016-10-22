require 'terminfo'
require 'tco'
require 'color'

# Inspired by Processing (https://processing.org)
class Sketch
  attr_reader :frameCount, :context

  def initialize
    @target_fps = 30.0
    @frameCount = 0
    @frame_limit = 100
    @context = self.class.default_context
    @contexts = []
    @contexts << @context
    fill_background
    hide_cursor
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
    beginning_time = Time.now
    while @frameCount < @frame_limit
      tick
    end
    end_time = Time.now
    ellapsed = end_time - beginning_time
    true_frame_rate = @frameCount / ellapsed

    summary = "Runtime: #{ellapsed} secs | Framerate: #{true_frame_rate}"
    fill(self.class.default_bg_color)
    print_at(summary, 0, height - 3)
    puts
  end

  def width
    TermInfo.screen_width
  end

  def height
    TermInfo.screen_height
  end

  def hide_cursor
    TermInfo.control('civis')
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

  def color(r, g, b, max: 255)
    max *= 1.0
    Color::RGB.from_fraction(r / max, g / max, b / max)
  end

  def self.default_bg_color
    Color::RGB.by_hex('#333333')
  end

  def fill(color)
    context[:bg] = color
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