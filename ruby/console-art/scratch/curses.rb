# clear the screen
print %x{clear}

require 'curses'

# Curses Docs: 
# http://ruby-doc.org/stdlib-2.0.0/libdoc/curses/rdoc/Curses.html#COLORS

Curses.init_screen
Curses.start_color

x = Curses.colors
Curses.addstr(x.to_s)
Curses.addstr(' more')
Curses.addstr(' and more')
Curses.refresh

# Show that tcolors are initialized to 0, 0, 0 (Black)
color_info_at_0 = Curses.color_content(0)
Curses.setpos(2,0)
Curses.addstr("... color info: #{color_info_at_0.to_s}")

# SET UP ONE foreground-background color pair and turn it on.
MY_GREEN = 1
Curses.init_color(MY_GREEN, 20, 800, 50)
MY_DARK_GRAY = 2
Curses.init_color(MY_DARK_GRAY, 200, 200, 200)
MY_COLOR_PAIR = 1
Curses.init_pair(MY_COLOR_PAIR, MY_GREEN, MY_DARK_GRAY)
pair = Curses.color_pair(MY_COLOR_PAIR)
Curses.attron(pair)
Curses.refresh

begin
  x = Curses.cols / 2  # We will center our text
  y = Curses.lines / 2
  Curses.setpos(y - 3, x - ('Hello World'.size/2.0).to_i)  # Move the cursor to the center of the screen
  Curses.addstr("Hello World")  # Display the text
  
  str = 'Type any key to exit...'
  Curses.setpos(y + 3, x - (str.size/2.0).to_i)  # Move the cursor to the center of the screen
  Curses.addstr(str)  # Display the text
  Curses.refresh  # Refresh the screen
  Curses.getch  # Waiting for a pressed key to exit
ensure
  Curses.close_screen
end