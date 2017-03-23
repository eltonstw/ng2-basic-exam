import { Angular2MaterialLab3Page } from './app.po';

describe('angular2-material-lab3 App', function() {
  let page: Angular2MaterialLab3Page;

  beforeEach(() => {
    page = new Angular2MaterialLab3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
