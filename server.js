import debug from 'debug';
import { app } from './app.js';

var port = process.env.PORT || 8091;
app.listen(port, () => {
    debug(`apicarto is running on port ${port} (see http://localhost:${port}/api/doc/ )`);
});
