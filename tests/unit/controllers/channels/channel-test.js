import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:channels.channel', 'Unit | Controller | channel', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('init values for selectedPost and selectedPostStats should be empty', function(assert) {
  let controller = this.subject();

  assert.equal(controller.get('selectedPost').length, 0, 'selectedPost initialized');
  assert.equal(controller.get('selectedPostStats').length, 0, 'selectedPostStats initialized');
});

test('should update statsNumOfPosts and statsNumOfAuthors when model changes', function(assert) {
  let controller = this.subject();

  controller.set("model",  {
    entries:[
        {
          title: "title_example",
          author: "author1"
        },
        {
          title: "title_example",
          author: "author2"
        },
        {
          title: "title_example",
          author: "author1"
        },
      ]
  });

  assert.equal(controller.get('statsNumOfPosts'), 3, 'statsNumOfPosts changes correctly');
  assert.equal(controller.get('statsNumOfAuthors'), 2, 'statsNumOfAuthors changes correctly');
});

test('countInString should return letter frequencies', function(assert) {
  let controller = this.subject();

  let frequencies = {
    a: 1,
    b: 2,
    1: 1
  };

  assert.deepEqual(controller.countInString("abb1",{}, 0), frequencies, 'countInString return letter frequencies');
});

test('getLettersRelativeRate should return frequencies data', function(assert) {
  let controller = this.subject();

  let frequencies = {
    a: 1,
    b: 2
  };

  let frequenciesData = [
    {
      value: 2,
      label: "b",
      color:"#F7464A",
      highlight: "#FF5A5E",
    },
    {
      value: 1,
      label: "a",
      color:"#F7464A",
      highlight: "#FF5A5E",
    }   
  ];

  assert.deepEqual(controller.getLettersRelativeRate(frequencies), frequenciesData, 'getLettersRelativeRate return letter frequencies data');
});