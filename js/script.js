import {createHeader} from "./components/createHeader.js";
import {fetchCategories} from "./service/apiservice.js";
import {createCategory} from "./components/createCategory.js";
import {createElement} from "./helper/createElement.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const app = document.querySelector('#app');

    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(app);


    const renderIndex = async e => {
        e?.preventDefault();
        const categories = await fetchCategories();

        if (categories.error) {
            const errorText = createElement('p', {
                className: 'server-error',
                textContent: 'Ошибка сервера!',
            });
            app.append(errorText);
            return;
        }

        categoryObj.mount(categories);
    };

    await renderIndex();

    headerObj.headerLogoLink.addEventListener('click', renderIndex);
    headerObj.headerBtn.addEventListener('click', () => {
        categoryObj.unmount();
        headerObj.updateHeaderTitle('Новая категория');
    });
};

initApp();
