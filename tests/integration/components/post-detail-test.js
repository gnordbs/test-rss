import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-detail', 'Integration | Component | post detail', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('postData', {
    author: "author_example",
    title: "title_example",
    content: "content_example",
    link: "link_example"
  });

  this.render(hbs`{{post-detail post=postData}}`);

  assert.equal(this.$('#detail_post_title').text().trim(), 'title_example', 'title is correct');
  assert.equal(this.$('#detail_post_author').text().trim(), 'author_example', 'author is correct');
  assert.equal(this.$('#detail_post_content').text().trim(), 'content_example', 'author is correct');
  assert.equal(this.$('#detail_post_title a').attr('href'), 'link_example', 'link is correct');

});
