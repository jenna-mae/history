const gallery = require('../../../../../app/src/lib/galleries');
const routes = require('../../../lib/routes');
const validation = require('../../../lib/validation');

const handler = ({ query: { raw: isRaw } }, reply) => new Promise((resolve) => {
  const formatJson = (json) => {
    const context = { galleries: json };
    context.state = `window.state = ${JSON.stringify(context)};`;

    return context;
  };
  const viewPath = 'api/server/plugins/editAlbum/components/page.jsx';

  const handleResponse = ({ galleries: json }) => ((isRaw)
    ? resolve(reply(formatJson(json)))
    : resolve(reply.view(viewPath, formatJson(json))));
  const handleError = routes.createErrorReply(reply);

  gallery.get()
    .then(handleResponse)
    .catch(handleError);
});

const register = (server) => {
  server.route({
    method: 'GET',
    path: '/album',
    options: {
      handler,
      tags: ['api', 'react'],
      validate: {
        query: {
          raw: validation.raw,
        },
      },
    },
  });

  server.route(routes.staticRoute({ urlSegment: 'album', pluginName: 'editAlbum' }));

  server.route(routes.staticRouteJquery({ urlSegment: 'album' }));
};

const plugin = {
  register,
  name: 'edit-album',
  version: '0.3.0',
};

module.exports = { plugin };
