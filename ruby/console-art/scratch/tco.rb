require "tco"

# selected via: http://www.colorpicker.com
resources = ["#710380", "#ED8611", "#DBDBDB", "#262626", "#DEBD2C"]
10.times do
  resources.each { |colour| print "    ".bg colour }
  puts
end




# dashes
100.times do |i|
  color = i % 2 == 0 ? "#ffffff" : "#000000"
  print ' '.bg color 
end
puts

# checks / xmarks with background
checkmark = " \u2713 "
xmark = " \u2717 "
ndash = " \u2013 "
print checkmark.encode('utf-8').bg "#229922"
print xmark.encode('utf-8').bg "#992222"
print ndash.encode('utf-8').bg "#888888"
puts

puts
puts