#gem install sparql
#http://www.rubydoc.info/github/ruby-rdf/sparql/frames
# Code from: https://w.wiki/CzE

require 'dotenv/load'
require 'sparql/client'

endpoint = "https://query.wikidata.org/sparql"
sparql = <<'SPARQL'.chop
#added before 2016-10

SELECT ?elementLabel ?_boiling_point ?_melting_point ?_electronegativity ?_density ?_mass
WHERE
{
  ?element wdt:P31 wd:Q11344.
  ?element wdt:P2102 ?_boiling_point.
  ?element wdt:P2101 ?_melting_point.
  ?element wdt:P1108 ?_electronegativity.
  ?element wdt:P2054 ?_density.
  ?element wdt:P2067 ?_mass.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 100
SPARQL

agent_name = ENV['SPARQL_USER_AGENT']
client = SPARQL::Client.new(endpoint, method: :get, headers: {'User-Agent' => agent_name })
rows = client.query(sparql)

puts "Number of rows: #{rows.size}"
for row in rows
  for key,val in row do
    # print "#{key.to_s.ljust(10)}: #{val}\t"
    print "#{key}: #{val}\t"
  end
  print "\n"
end



