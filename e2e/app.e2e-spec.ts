import { BootPage } from './app.po';

describe('boot App', function() {
  let page: BootPage;

  beforeEach(() => {
    page = new BootPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
