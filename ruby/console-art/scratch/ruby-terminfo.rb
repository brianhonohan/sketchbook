require 'terminfo'
require 'tco'

TermInfo.control("cuf", 7)    # cursor forward 7 columns
print TermInfo.screen_size        # use TIOCGWINSZ, LINES/COLUMNS env. or terminfo lines#/cols#

# Combining:
# http://www.a-k-r.org/ruby-terminfo/rdoc/TermInfo.html#method-i-control_string
#
# With list of terminal commands:
# http://pubs.opengroup.org/onlinepubs/7908799/xcurses/terminfo.html 

TermInfo.control("cuf", 30)

# test compatibility of tco with terminfo:
checkmark = " \u2713 "
print checkmark.encode('utf-8').bg "#229922"

print 'Hello world'

sleep(1)


# move back
TermInfo.control("cub", 'world'.size)  # to overwrite the word 'again'
print 'and goodbye'


puts
puts


