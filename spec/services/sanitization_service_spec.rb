require "rails_helper"

describe SanitizationService do
  let(:service) { SanitizationService.new }

  describe "sanitize" do

    it "always allows paragraphs and breaks to pass through" do
      input = <<~HTML
        <p>paragraph<br>with<br>breaks</p>
      HTML
      features = []
      expect(service.sanitize(input, features)).to eq input
    end

    it "allows titles to pass through when title feature is enabled" do
      input = <<~HTML
        <h2>title</h2>
        <h3>subtitle</h3>
      HTML
      features = [:title]
      expect(service.sanitize(input, features)).to eq input
    end

    it "allows alignment to pass through when alignment feature is enabled" do
      input = <<~HTML
        <p>left align</p>
        <p class="ql-align-center">center align</p>
        <p class="ql-align-right">right align</p>
      HTML
      features = [:alignment]
      expect(service.sanitize(input, features)).to eq input
    end

    it "allows lists to pass through when list feature is enabled" do
      input = <<~HTML
        <ol>
          <li>numered</li>
          <li>list</li>
        </ol>
        <p><br></p>
        <ul>
          <li>Bullet</li>
          <li>List</li>
        </ul>
      HTML
      features = [:list]
      expect(service.sanitize(input, features)).to eq input
    end

    it "allows decoration to pass through when decoration feature is enabled" do
      input = <<~HTML
        <p>
          <strong>bold text</strong>
        </p>
        <p>
          <em>cursive text</em>
        </p>
      HTML
      features = [:decoration]
      expect(service.sanitize(input, features)).to eq input
    end

    it "allows links to pass through when link feature is enabled" do
      input = <<~HTML
        <a href="https://www.google.com" target="_blank">Link</a>
      HTML
      features = [:link]
      expect(service.sanitize(input, features)).to eq input
    end

    it "allows images to pass through when title feature is enabled" do
      input = <<~HTML
        <p>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="display: block;margin:auto;" width="313" height="160.33516960470087" data-align="center">
        </p>
      HTML
      features = [:image]
      expect(service.sanitize(input, features)).to eq input
    end

    it "allows video to pass through when video feature is enabled" do
      input = <<~HTML
        "<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/Y1mtif1B8k0?showinfo=0" data-blot-formatter-unclickable-bound="true" width="497" height="248.5" style="display: block;margin:auto;cursor: nwse-resize;" data-align="center"></iframe>"
      HTML
      features = [:video]
      expect(service.sanitize(input, features)).to eq input
    end

  end

  describe "remove_empty_paragraphs" do
    it "doesn't modify invalid html" do
      input = "<p Not</p>really <h1>valid</div>"
      output = service.remove_empty_paragraphs(input)
      expect(output).to eq input
    end

    it "deletes empty <p/> tag at the end" do
      html = "<h1>Nice</h1><p></p>"
      output = service.remove_empty_paragraphs(html)
      expect(output).to eq "<h1>Nice</h1>"
    end

    it "deletes <p/> tag that only contain line breaks at the end" do
      html = "<h1>Nice</h1><p><br></p>"
      output = service.remove_empty_paragraphs(html)
      expect(output).to eq "<h1>Nice</h1>"
    end

    it "deletes empty <p/> tags at the end" do
      html = "<h1>Nice</h1><p></p><p></p>"
      output = service.remove_empty_paragraphs(html)
      expect(output).to eq "<h1>Nice</h1>"
    end

    it "deletes empty <p/> tags that only contain line breaks at the end" do
      html = "<h1>Nice</h1><p><br></p><p></p>"
      output = service.remove_empty_paragraphs(html)
      expect(output).to eq "<h1>Nice</h1>"
    end

    it "doesn't delete empty <p/> tags in between" do
      html = "<p>Great</p><p></p><p>Really</p>"
      output = service.remove_empty_paragraphs(html)
      expect(output).to eq html
    end

    it "doesn't delete empty <p/> tags at the start" do
      html = "<p></p><h1>Nice</h1>"
      output = service.remove_empty_paragraphs(html)
      expect(output).to eq html
    end

    it "doesn't delete non-empty <p/> tags at the end" do
      html = "<h1>Nice</h1><p>Well<br>done</p>"
      output = service.remove_empty_paragraphs(html)
      expect(output).to eq html
    end
  end

end
