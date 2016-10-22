clear_code = %x{clear}

puts 'Press enter to clear the screen.'
$stdin.gets
print clear_code
puts "It's cleared!  ... counting to 10 before quiting"

# backspace to overwrite previous output
10.times{|i| STDOUT.write "\r#{i}"; sleep 1} 

puts
puts