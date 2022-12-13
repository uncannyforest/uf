require 'yaml'

class UfRecord

  def initialize
    @data = YAML.load(File.read(config = File.join(Dir.pwd, 'config', "uncannyforest.yaml")))
  end

  def comics_with_spoilers
    @data['comics']
  end

end
