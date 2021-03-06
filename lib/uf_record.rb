require 'record'

class UfRecord

  @@time_zone = "Mountain Time (US & Canada)"

  attr_reader :num_comics

  def initialize
    @data = Record.load('uncannyforest')
    init_num_comics
  end

  def comics_with_spoilers
    @data[:comics]
  end

  def comics
    comics_with_spoilers.first(@num_comics)
  end

  def init_num_comics
    max_comic = @data[:comics].length - 1
    while spoilers max_comic
      max_comic = max_comic - 1
    end
    @num_comics = max_comic + 1
  end

  def spoilers comic
    comic_date = @data[:comics][comic][:date]
    if comic_date.nil?
      return false
    end
    today = Time.now.in_time_zone(@@time_zone).to_date
    comic_date > today
  end

  def self.post_time_utc date_time
    date_time.in_time_zone(@@time_zone).utc
  end

end
