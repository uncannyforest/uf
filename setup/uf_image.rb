# run using e.g. `rails runner setup/uf_image.rb 4 5`
# or use the img script as shortcut

require_relative 'lib/panel'
require_relative 'lib/uf_record'

class UfImage

  SOURCE_PATH = "setup/panels/%{filename}.png"

  # params: rows, comic [from DESKTOP_PATH]
  DT_COMMAND = "convert -gravity Center -background white %{rows} -append +repage -extent 1800x public/images/" + Panel::DESKTOP_PATH
  DT_COMMAND_ROW = " \\( %{panels} +append \\) "
  DT_COMMAND_PANEL_SEP = " "

  MOB_COMMAND = "mogrify -format jpg -path public/images/comics setup/panels/%{comic}-*.png"

    def initialize
      @uf_record = UfRecord.new
    end

  def gen_desktop_assets comic_num
    panels = Panel.list_from_layout(
        comic_num,
        @uf_record.comics_with_spoilers[comic_num]['layout'],
        SOURCE_PATH)
    row_commands = ""
    panels.each do |row|
      row_commands << (DT_COMMAND_ROW % {panels: row.join(DT_COMMAND_PANEL_SEP)})
    end
    command = DT_COMMAND % {rows: row_commands, comic: comic_num}
    puts "  #{command}"
    system command
  end

  def gen_mobile_assets comic_num
    command = MOB_COMMAND % {comic: comic_num}
    puts "  #{command}"
    system command
  end

end

def main
  uf_image = UfImage.new
  ARGV.each do |comic|
    puts "Generating desktop image for comic #{comic}"
    uf_image.gen_desktop_assets comic.to_i
    puts "Generating mobile images for comic #{comic}"
    uf_image.gen_mobile_assets comic.to_i
  end
end

main()
