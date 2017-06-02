import Vue from 'vue';
import timeagoTooltip from '~/vue_shared/components/time_ago_tooltip.vue';
import '~/lib/utils/datetime_utility';

describe('Time ago with tooltip component', () => {
  let TimeagoTooltip;
  let vm;

  beforeEach(() => {
    TimeagoTooltip = Vue.extend(timeagoTooltip);
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should render timeago with a bootstrap tooltip', () => {
    vm = new TimeagoTooltip({
      propsData: {
        time: '2017-05-08T14:57:39.781Z',
      },
    }).$mount();

    expect(vm.$el.tagName).toEqual('TIME');
    expect(vm.$el.classList.contains('js-timeago')).toEqual(true);
    expect(
      vm.$el.getAttribute('data-original-title'),
    ).toEqual(gl.utils.formatDate('2017-05-08T14:57:39.781Z'));
    expect(vm.$el.getAttribute('data-placement')).toEqual('top');

    const timeago = gl.utils.getTimeago();

    expect(vm.$el.textContent.trim()).toEqual(timeago.format('2017-05-08T14:57:39.781Z'));
  });

  it('should render tooltip placed in bottom', () => {
    vm = new TimeagoTooltip({
      propsData: {
        time: '2017-05-08T14:57:39.781Z',
        tooltipPlacement: 'bottom',
      },
    }).$mount();

    expect(vm.$el.getAttribute('data-placement')).toEqual('bottom');
  });

  it('should render short format class', () => {
    vm = new TimeagoTooltip({
      propsData: {
        time: '2017-05-08T14:57:39.781Z',
        shortFormat: true,
      },
    }).$mount();

    expect(vm.$el.classList.contains('js-short-timeago')).toEqual(true);
  });

  it('should render provided html class', () => {
    vm = new TimeagoTooltip({
      propsData: {
        time: '2017-05-08T14:57:39.781Z',
        cssClass: 'foo',
      },
    }).$mount();

    expect(vm.$el.classList.contains('foo')).toEqual(true);
  });
});
