import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';

export default class PodcastFetchComponent extends Component {
  @tracked url;

  @tracked podcast;

  constructor() {
    super(...arguments);
    this.fetchUrl();
  }

  async fetchUrl() {
    if(!this.url) { return }

    const fullUrl = `/api/fetch-podcast?url=${this.url.trim()}`;

    try {
      let result = await fetch(fullUrl)
      let podcast = await result.json()
      this.podcast = podcast
    } catch (e) {
      console.log(e)
    }
  }  

  @action
  updateUrl(ev) {
    this.url = ev.target.value;
    debounce(this, this.fetchUrl, 500);
  }
}
