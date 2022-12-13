class Panel
  PANEL_FILENAME = "%{comic}-%{panel}"
  MOBILE_PATH = "comics/%{filename}.jpg"
  DESKTOP_PATH = "comics/%{comic}.png"

  def self.gen_path(comic_num, panel, path_template)
    path_template % {filename: PANEL_FILENAME %
      {comic: comic_num, panel: panel}}
  end

  # List panels from layout, fallback to disk local directory in individual rows.
  # For rendering to single desktop image.
  # path_template must contain %{filename}
  def self.list_from_layout(comic_num, layout_data, path_template)
    @list = []
    if layout_data.nil?
      panel = 0
      path = gen_path(comic_num, panel, path_template)
      while File.exist? path
        @list << [path]
        panel = panel + 1
        path = gen_path(comic_num, panel, path_template)
      end
    else
      layout_data.each do |data_row|
        row = []
        data_row.each {|panel| row << gen_path(comic_num, panel, path_template)}
        @list << row
      end
    end
    @list
  end

end
