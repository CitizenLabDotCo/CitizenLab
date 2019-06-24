class PageFileUploader < CarrierWave::Uploader::Base
  include BaseFileUploader


  def extension_whitelist
    %w(pdf doc docx xls xlsx ppt pptx txt sxw sxc sxi sdw sdc sdd csv mp3 mp4 mkv avi)
  end

  def size_range
    1.byte..50.megabytes
  end

end
