export type AdminLocale =
  | "ru"
  | "en";

type AdminMessages = {
  common: {
    loading: string;
    error: string;
    save: string;
    saving: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    back: string;
    refresh: string;
    search: string;
    notSpecified: string;
    noName: string;
    today: string;
    currency: string;
  };

  header: {
    caption: string;
    title: string;
    catalog: string;
    addCake: string;
  };

  sidebar: {
    menu: string;
    openMenu: string;
    closeMenu: string;
    panel: string;
    navigationLabel: string;
    dashboard: string;
    orders: string;
    cakes: string;
    constructor: string;
    categories: string;
    fillings: string;
    settings: string;
    returnToSite: string;
    crm: string;
  };

  dashboard: {
    eyebrow: string;
    title: string;
    description: string;
    addCake: string;

    summary: {
      ordersToday: string;
      ordersTodayDescription: string;
      inProgress: string;
      inProgressDescription: string;
      publishedCakes: string;
      publishedCakesDescription: string;
      revenueToday: string;
      revenueTodayDescription: string;
    };

    recentOrders: {
      eyebrow: string;
      title: string;
      allOrders: string;
      empty: string;
      order: string;
      customer: string;
      date: string;
      status: string;
      amount: string;
      phoneMissing: string;
    };

    quickActions: {
      eyebrow: string;
      title: string;

      addCake: {
        title: string;
        description: string;
      };

      manageCakes: {
        title: string;
        description: string;
      };

      openOrders: {
        title: string;
        description: string;
      };

      constructor: {
        title: string;
        description: string;
      };
    };

    progress: {
      eyebrow: string;
      title: string;
      description: string;
      readiness: string;
      note: string;
    };
  };

  orders: {
    eyebrow: string;
    title: string;
    description: string;
    refresh: string;
    errorPrefix: string;
    loading: string;
    emptyTitle: string;
    emptyDescription: string;
    allOrders: string;
    found: string;
    orderNumber: string;
    orderCard: string;
    created: string;
    status: string;

    statuses: {
      new: string;
      confirmed: string;
      in_progress: string;
      ready: string;
      completed: string;
      cancelled: string;
    };

    customer: {
      title: string;
      name: string;
      phone: string;
      email: string;
      messenger: string;
    };

    delivery: {
      title: string;
      method: string;
      delivery: string;
      pickup: string;
      date: string;
      time: string;
      address: string;
      dateMissing: string;
      timeMissing: string;
    };

    cake: {
      title: string;
      weight: string;
      filling: string;
      color: string;
      decorations: string;
      inscription: string;
      noInscription: string;
      comment: string;
      noComment: string;
      price: string;
    };
  };

  cakesPage: {
    eyebrow: string;
    title: string;
    description: string;
    addCake: string;
    loading: string;
    loadErrorTitle: string;
    loadErrorFallback: string;
  };

  newCakePage: {
    eyebrow: string;
    title: string;
    description: string;
    backToCakes: string;
  };

  editCakePage: {
    eyebrow: string;
    title: string;
    description: string;
    backToCakes: string;
    loading: string;
    loadErrorTitle: string;
  };

  cakeTable: {
    searchPlaceholder: string;

    filters: {
      all: string;
      published: string;
      hidden: string;
    };

    empty: {
      noCakesTitle: string;
      noResultsTitle: string;
      noCakesDescription: string;
      noResultsDescription: string;
      addFirstCake: string;
    };

    columns: {
      cake: string;
      categories: string;
      variants: string;
      price: string;
      status: string;
      actions: string;
    };

    badges: {
      popular: string;
      new: string;
    };

    noCategory: string;
    mainVariant: string;
    noVariants: string;
    priceFrom: string;
    priceMissing: string;
    published: string;
    hidden: string;
    edit: string;
    delete: string;

    confirmDelete: (
      name: string,
    ) => string;

    statusChangeError: string;
    deleteError: string;
  };

  cakeForm: {
    validation: {
      nameRequired: string;
      slugRequired: string;
      variantsInvalid: string;
      saveError: string;
    };

    mainInfo: {
      title: string;
      description: string;
      name: string;
      namePlaceholder: string;
      slug: string;
      slugPlaceholder: string;
      pageAddress: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      categories: string;
      categoriesPlaceholder: string;
      categoriesHint: string;
      sortOrder: string;
    };

    variants: {
      title: string;
      description: string;
      addWeight: string;
      weight: string;
      price: string;
      oldPrice: string;
      optional: string;
      default: string;
      makeDefault: string;
      remove: string;
    };

    image: {
      title: string;
      description: string;
    };

    publication: {
      title: string;
      description: string;

      published: {
        title: string;
        description: string;
      };

      popular: {
        title: string;
        description: string;
      };

      new: {
        title: string;
        description: string;
      };
    };

    summary: {
      eyebrow: string;
      newCake: string;
      variants: string;
      priceFrom: string;
      priceMissing: string;
      status: string;
      published: string;
      hidden: string;
    };

    cancel: string;
    saving: string;
    saveChanges: string;
    addCake: string;
  };

  imageUploader: {
    allowedTypesError: string;
    sizeError: string;
    uploadError: string;
    imageAlt: string;
    placeholderTitle: string;
    placeholderDescription: string;
    uploading: string;
    replace: string;
    upload: string;
    remove: string;
  };

  constructorPage: {
    eyebrow: string;
    title: string;
    description: string;
    addElement: string;
    groupDescription: string;

    groups: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ];
  };

  categoriesPage: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  };

  fillingsPage: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  };

  settingsPage: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  };
};

const ru: AdminMessages = {
  common: {
    loading: "Загрузка...",
    error: "Ошибка",
    save: "Сохранить",
    saving: "Сохранение...",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Изменить",
    add: "Добавить",
    back: "Назад",
    refresh: "Обновить",
    search: "Поиск",
    notSpecified: "Не указано",
    noName: "Без имени",
    today: "Сегодня",
    currency: "₸",
  },

  header: {
    caption: "STK Bakery",
    title: "Панель управления",
    catalog: "Каталог",
    addCake: "+ Добавить торт",
  },

  sidebar: {
    menu: "Меню",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    panel: "Панель управления",
    navigationLabel: "Админ-панель",
    dashboard: "Главная",
    orders: "Заказы",
    cakes: "Торты",
    constructor: "Конструктор",
    categories: "Категории",
    fillings: "Начинки",
    settings: "Настройки",
    returnToSite: "Вернуться на сайт",
    crm: "STK Bakery CRM",
  },

  dashboard: {
    eyebrow: "Обзор бизнеса",
    title: "Добро пожаловать в STK Bakery",
    description:
      "Здесь собраны торты, заказы и все элементы конструктора.",
    addCake: "Добавить торт",

    summary: {
      ordersToday: "Заказы сегодня",
      ordersTodayDescription:
        "Новые заказы за текущий день",
      inProgress: "В работе",
      inProgressDescription:
        "Заказы, которые сейчас готовятся",
      publishedCakes:
        "Опубликовано тортов",
      publishedCakesDescription:
        "Торты, доступные клиентам",
      revenueToday: "Выручка сегодня",
      revenueTodayDescription:
        "Готовые и завершённые заказы",
    },

    recentOrders: {
      eyebrow: "Последние заявки",
      title: "Последние заказы",
      allOrders: "Все заказы →",
      empty: "Заказов пока нет.",
      order: "Заказ",
      customer: "Клиент",
      date: "Дата",
      status: "Статус",
      amount: "Сумма",
      phoneMissing:
        "Телефон не указан",
    },

    quickActions: {
      eyebrow: "Быстрый доступ",
      title: "Что будем делать",

      addCake: {
        title: "Добавить новый торт",
        description:
          "Название, фотография, категории, веса и цены.",
      },

      manageCakes: {
        title: "Управление тортами",
        description:
          "Редактирование, публикация и скрытие товаров.",
      },

      openOrders: {
        title: "Открыть заказы",
        description:
          "Просмотр новых заказов и изменение их статусов.",
      },

      constructor: {
        title:
          "Элементы конструктора",
        description:
          "Основы, декор, ягоды, цветы и другие PNG-слои.",
      },
    },

    progress: {
      eyebrow: "Текущий этап",
      title: "Подготовка к показу",
      description:
        "Основной функционал каталога, конструктора и обработки заказов уже работает.",
      readiness: "Готовность CRM",
      note:
        "Осталось проверить основные сценарии и мобильную версию.",
    },
  },

  orders: {
    eyebrow: "Мини CRM",
    title: "Заказы",
    description:
      "Все заявки из конструктора STK Bakery.",
    refresh: "Обновить",
    errorPrefix: "Ошибка:",
    loading: "Загрузка заказов...",
    emptyTitle: "Заказов пока нет",
    emptyDescription:
      "Новый заказ появится здесь после оформления на сайте.",
    allOrders: "Все заказы",
    found: "Найдено",
    orderNumber: "Заказ №",
    orderCard: "Карточка заказа",
    created: "Создан",
    status: "Статус",

    statuses: {
      new: "Новый",
      confirmed: "Подтверждён",
      in_progress: "В работе",
      ready: "Готов",
      completed: "Выдан",
      cancelled: "Отменён",
    },

    customer: {
      title: "Клиент",
      name: "Имя",
      phone: "Телефон",
      email: "E-mail",
      messenger: "Мессенджер",
    },

    delivery: {
      title: "Получение",
      method: "Способ",
      delivery: "Доставка",
      pickup: "Самовывоз",
      date: "Дата",
      time: "Время",
      address: "Адрес",
      dateMissing: "Не указана",
      timeMissing: "Не указано",
    },

    cake: {
      title: "Торт",
      weight: "Вес",
      filling: "Начинка",
      color: "Цвет",
      decorations: "Декораций",
      inscription: "Надпись",
      noInscription: "Нет",
      comment:
        "Комментарий клиента",
      noComment:
        "Комментарий отсутствует",
      price: "Стоимость",
    },
  },

  cakesPage: {
    eyebrow: "Каталог",
    title: "Торты",
    description:
      "Добавляйте фотографии, варианты веса и цены. Управляйте публикацией тортов без изменения кода.",
    addCake: "Добавить торт",
    loading: "Загружаем торты...",
    loadErrorTitle:
      "Не удалось загрузить торты",
    loadErrorFallback:
      "Не удалось загрузить торты.",
  },

  newCakePage: {
    eyebrow: "Каталог",
    title: "Добавить торт",
    description:
      "Заполните карточку торта, добавьте фотографию, веса и цены.",
    backToCakes: "← Назад к тортам",
  },

  editCakePage: {
    eyebrow: "Каталог",
    title: "Редактировать торт",
    description:
      "Измените данные, фотографию, варианты веса и цены.",
    backToCakes: "← Назад к тортам",
    loading: "Загружаем торт...",
    loadErrorTitle:
      "Не удалось загрузить торт",
  },

  cakeTable: {
    searchPlaceholder:
      "Поиск по названию, slug или категории",

    filters: {
      all: "Все",
      published: "Опубликованные",
      hidden: "Скрытые",
    },

    empty: {
      noCakesTitle:
        "Тортов пока нет",
      noResultsTitle:
        "Ничего не найдено",
      noCakesDescription:
        "Добавьте первый торт через панель управления.",
      noResultsDescription:
        "Попробуйте изменить запрос или фильтр.",
      addFirstCake:
        "+ Добавить первый торт",
    },

    columns: {
      cake: "Торт",
      categories: "Категории",
      variants: "Варианты",
      price: "Цена",
      status: "Статус",
      actions: "Действия",
    },

    badges: {
      popular: "Популярный",
      new: "Новинка",
    },

    noCategory: "Без категории",
    mainVariant: "кг основной",
    noVariants: "Нет вариантов",
    priceFrom: "от",
    priceMissing: "Не указана",
    published: "Опубликован",
    hidden: "Скрыт",
    edit: "Изменить",
    delete: "Удалить",

    confirmDelete: (name) =>
      `Удалить торт «${name}»?\n\nЭто действие нельзя отменить.`,

    statusChangeError:
      "Не удалось изменить статус.",

    deleteError:
      "Не удалось удалить торт.",
  },

  cakeForm: {
    validation: {
      nameRequired:
        "Введите название торта.",
      slugRequired: "Введите slug.",
      variantsInvalid:
        "Проверьте вес и цену вариантов.",
      saveError:
        "Не удалось сохранить торт.",
    },

    mainInfo: {
      title: "Основная информация",
      description:
        "Название и описание торта для каталога.",
      name: "Название торта *",
      namePlaceholder:
        "Например: Клубничное облако",
      slug: "Slug *",
      slugPlaceholder:
        "strawberry-cloud",
      pageAddress: "Адрес страницы",
      descriptionLabel: "Описание",
      descriptionPlaceholder:
        "Опишите вкус, оформление и особенности торта",
      categories: "Категории",
      categoriesPlaceholder:
        "Детские, Для девочек, Ягодные",
      categoriesHint:
        "Разделяйте категории запятыми.",
      sortOrder:
        "Порядок отображения",
    },

    variants: {
      title: "Вес и стоимость",
      description:
        "Добавьте все доступные варианты торта.",
      addWeight: "+ Добавить вес",
      weight: "Вес, кг",
      price: "Цена, ₸",
      oldPrice: "Старая цена, ₸",
      optional: "Необязательно",
      default: "Основной",
      makeDefault:
        "Сделать основным",
      remove: "Удалить вариант",
    },

    image: {
      title: "Фотография",
      description:
        "Главное изображение для карточки.",
    },

    publication: {
      title: "Публикация",
      description:
        "Настройте видимость и метки.",

      published: {
        title: "Опубликован",
        description:
          "Торт отображается клиентам.",
      },

      popular: {
        title: "Популярный",
        description:
          "Показывать метку «Популярный».",
      },

      new: {
        title: "Новинка",
        description:
          "Показывать метку «Новинка».",
      },
    },

    summary: {
      eyebrow: "Предварительно",
      newCake: "Новый торт",
      variants: "Вариантов",
      priceFrom: "Цена от",
      priceMissing: "Не указана",
      status: "Статус",
      published: "Опубликован",
      hidden: "Скрыт",
    },

    cancel: "Отмена",
    saving: "Сохранение...",
    saveChanges:
      "Сохранить изменения",
    addCake: "Добавить торт",
  },

  imageUploader: {
    allowedTypesError:
      "Поддерживаются JPG, PNG, WebP и AVIF.",
    sizeError:
      "Размер изображения не должен превышать 10 МБ.",
    uploadError:
      "Не удалось загрузить фотографию.",
    imageAlt: "Фотография торта",
    placeholderTitle:
      "Фотография торта",
    placeholderDescription:
      "JPG, PNG, WebP или AVIF до 10 МБ",
    uploading: "Загрузка...",
    replace:
      "Заменить фотографию",
    upload: "Загрузить фотографию",
    remove: "Удалить",
  },

  constructorPage: {
    eyebrow: "Конструктор",
    title: "Элементы конструктора",
    description:
      "Управление PNG-слоями, ценами, порядком отображения и доступностью.",
    addElement: "Добавить элемент",
    groupDescription:
      "Управление изображениями и настройками категории.",

    groups: [
      "Основы",
      "Подтёки",
      "Ягоды",
      "Цветы",
      "Макаруны",
      "Жемчуг",
      "Шоколадный декор",
      "Бабочки",
      "Свечи",
      "Топперы",
    ],
  },

  categoriesPage: {
    eyebrow: "Каталог",
    title: "Категории",
    description:
      "Категории для каталога: детские, свадебные, бенто и другие.",
    emptyTitle:
      "Раздел категорий подготовлен",
    emptyDescription:
      "Пока категории хранятся у торта. Отдельное управление подключим после основной версии каталога.",
  },

  fillingsPage: {
    eyebrow: "Каталог",
    title: "Начинки",
    description:
      "Здесь будут названия, описания, изображения и дополнительная стоимость начинок.",
    emptyTitle:
      "Раздел начинок подготовлен",
    emptyDescription:
      "Полное управление начинками добавим после запуска основного каталога.",
  },

  settingsPage: {
    eyebrow: "Система",
    title: "Настройки",
    description:
      "Основные данные магазина, контакты, валюта и параметры оформления.",
    emptyTitle:
      "Настройки пока не требуются",
    emptyDescription:
      "Для быстрого запуска основные параметры останутся в коде. Интерфейс настроек добавим после MVP.",
  },
};

const en: AdminMessages = {
  common: {
    loading: "Loading...",
    error: "Error",
    save: "Save",
    saving: "Saving...",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    back: "Back",
    refresh: "Refresh",
    search: "Search",
    notSpecified: "Not specified",
    noName: "No name",
    today: "Today",
    currency: "₸",
  },

  header: {
    caption: "STK Bakery",
    title: "Admin Dashboard",
    catalog: "Catalog",
    addCake: "+ Add Cake",
  },

  sidebar: {
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    panel: "Admin Dashboard",
    navigationLabel: "Admin navigation",
    dashboard: "Dashboard",
    orders: "Orders",
    cakes: "Cakes",
    constructor: "Cake Builder",
    categories: "Categories",
    fillings: "Fillings",
    settings: "Settings",
    returnToSite: "Return to Website",
    crm: "STK Bakery CRM",
  },

  dashboard: {
    eyebrow: "Business Overview",
    title: "Welcome to STK Bakery",
    description:
      "Manage cakes, orders and all cake builder elements.",
    addCake: "Add Cake",

    summary: {
      ordersToday: "Orders Today",
      ordersTodayDescription:
        "New orders received today",
      inProgress: "In Progress",
      inProgressDescription:
        "Orders currently being prepared",
      publishedCakes:
        "Published Cakes",
      publishedCakesDescription:
        "Cakes available to customers",
      revenueToday: "Revenue Today",
      revenueTodayDescription:
        "Ready and completed orders",
    },

    recentOrders: {
      eyebrow: "Latest Requests",
      title: "Recent Orders",
      allOrders: "All Orders →",
      empty: "No orders yet.",
      order: "Order",
      customer: "Customer",
      date: "Date",
      status: "Status",
      amount: "Amount",
      phoneMissing:
        "Phone not provided",
    },

    quickActions: {
      eyebrow: "Quick Access",
      title: "What Would You Like to Do?",

      addCake: {
        title: "Add a New Cake",
        description:
          "Name, photo, categories, weights and prices.",
      },

      manageCakes: {
        title: "Manage Cakes",
        description:
          "Edit, publish or hide catalog items.",
      },

      openOrders: {
        title: "Open Orders",
        description:
          "Review new orders and update their status.",
      },

      constructor: {
        title:
          "Cake Builder Elements",
        description:
          "Bases, decorations, berries, flowers and other PNG layers.",
      },
    },

    progress: {
      eyebrow: "Current Stage",
      title: "Preparing for Launch",
      description:
        "The core catalog, cake builder and order management features are already working.",
      readiness: "CRM Readiness",
      note:
        "The remaining work is to test the main scenarios and mobile version.",
    },
  },

  orders: {
    eyebrow: "Mini CRM",
    title: "Orders",
    description:
      "All requests submitted through the STK Bakery cake builder.",
    refresh: "Refresh",
    errorPrefix: "Error:",
    loading: "Loading orders...",
    emptyTitle: "No Orders Yet",
    emptyDescription:
      "New orders will appear here after checkout.",
    allOrders: "All Orders",
    found: "Found",
    orderNumber: "Order #",
    orderCard: "Order Details",
    created: "Created",
    status: "Status",

    statuses: {
      new: "New",
      confirmed: "Confirmed",
      in_progress: "In Progress",
      ready: "Ready",
      completed: "Completed",
      cancelled: "Cancelled",
    },

    customer: {
      title: "Customer",
      name: "Name",
      phone: "Phone",
      email: "Email",
      messenger: "Messenger",
    },

    delivery: {
      title: "Fulfilment",
      method: "Method",
      delivery: "Delivery",
      pickup: "Pickup",
      date: "Date",
      time: "Time",
      address: "Address",
      dateMissing: "Not specified",
      timeMissing: "Not specified",
    },

    cake: {
      title: "Cake",
      weight: "Weight",
      filling: "Filling",
      color: "Color",
      decorations: "Decorations",
      inscription: "Inscription",
      noInscription: "None",
      comment: "Customer Comment",
      noComment: "No comment provided",
      price: "Price",
    },
  },

  cakesPage: {
    eyebrow: "Catalog",
    title: "Cakes",
    description:
      "Add photos, weight options and prices. Manage published cakes without changing the code.",
    addCake: "Add Cake",
    loading: "Loading cakes...",
    loadErrorTitle:
      "Could Not Load Cakes",
    loadErrorFallback:
      "Could not load cakes.",
  },

  newCakePage: {
    eyebrow: "Catalog",
    title: "Add Cake",
    description:
      "Complete the cake card and add a photo, weights and prices.",
    backToCakes: "← Back to Cakes",
  },

  editCakePage: {
    eyebrow: "Catalog",
    title: "Edit Cake",
    description:
      "Update cake details, photo, weight options and prices.",
    backToCakes: "← Back to Cakes",
    loading: "Loading cake...",
    loadErrorTitle:
      "Could Not Load Cake",
  },

  cakeTable: {
    searchPlaceholder:
      "Search by name, slug or category",

    filters: {
      all: "All",
      published: "Published",
      hidden: "Hidden",
    },

    empty: {
      noCakesTitle: "No Cakes Yet",
      noResultsTitle: "No Results Found",
      noCakesDescription:
        "Add your first cake through the admin dashboard.",
      noResultsDescription:
        "Try changing the search query or filter.",
      addFirstCake:
        "+ Add Your First Cake",
    },

    columns: {
      cake: "Cake",
      categories: "Categories",
      variants: "Variants",
      price: "Price",
      status: "Status",
      actions: "Actions",
    },

    badges: {
      popular: "Popular",
      new: "New",
    },

    noCategory: "No category",
    mainVariant: "kg default",
    noVariants: "No variants",
    priceFrom: "from",
    priceMissing: "Not specified",
    published: "Published",
    hidden: "Hidden",
    edit: "Edit",
    delete: "Delete",

    confirmDelete: (name) =>
      `Delete “${name}”?\n\nThis action cannot be undone.`,

    statusChangeError:
      "Could not update publication status.",

    deleteError:
      "Could not delete the cake.",
  },

  cakeForm: {
    validation: {
      nameRequired:
        "Enter a cake name.",
      slugRequired: "Enter a slug.",
      variantsInvalid:
        "Check the weight and price values.",
      saveError:
        "Could not save the cake.",
    },

    mainInfo: {
      title: "Basic Information",
      description:
        "Cake name and description for the catalog.",
      name: "Cake Name *",
      namePlaceholder:
        "Example: Strawberry Cloud",
      slug: "Slug *",
      slugPlaceholder:
        "strawberry-cloud",
      pageAddress: "Page address",
      descriptionLabel: "Description",
      descriptionPlaceholder:
        "Describe the flavor, design and special features",
      categories: "Categories",
      categoriesPlaceholder:
        "Kids, Girls, Berry Cakes",
      categoriesHint:
        "Separate categories with commas.",
      sortOrder: "Display Order",
    },

    variants: {
      title: "Weight and Price",
      description:
        "Add all available cake options.",
      addWeight: "+ Add Weight",
      weight: "Weight, kg",
      price: "Price, ₸",
      oldPrice: "Old Price, ₸",
      optional: "Optional",
      default: "Default",
      makeDefault: "Set as Default",
      remove: "Delete variant",
    },

    image: {
      title: "Photo",
      description:
        "Main image used in the catalog card.",
    },

    publication: {
      title: "Publication",
      description:
        "Configure visibility and labels.",

      published: {
        title: "Published",
        description:
          "The cake is visible to customers.",
      },

      popular: {
        title: "Popular",
        description:
          "Display the Popular label.",
      },

      new: {
        title: "New",
        description:
          "Display the New label.",
      },
    },

    summary: {
      eyebrow: "Preview",
      newCake: "New Cake",
      variants: "Variants",
      priceFrom: "Price From",
      priceMissing: "Not specified",
      status: "Status",
      published: "Published",
      hidden: "Hidden",
    },

    cancel: "Cancel",
    saving: "Saving...",
    saveChanges: "Save Changes",
    addCake: "Add Cake",
  },

  imageUploader: {
    allowedTypesError:
      "Supported formats: JPG, PNG, WebP and AVIF.",
    sizeError:
      "The image size must not exceed 10 MB.",
    uploadError:
      "Could not upload the photo.",
    imageAlt: "Cake photo",
    placeholderTitle: "Cake Photo",
    placeholderDescription:
      "JPG, PNG, WebP or AVIF up to 10 MB",
    uploading: "Uploading...",
    replace: "Replace Photo",
    upload: "Upload Photo",
    remove: "Remove",
  },

  constructorPage: {
    eyebrow: "Cake Builder",
    title: "Cake Builder Elements",
    description:
      "Manage PNG layers, prices, display order and availability.",
    addElement: "Add Element",
    groupDescription:
      "Manage category images and settings.",

    groups: [
      "Bases",
      "Drips",
      "Berries",
      "Flowers",
      "Macarons",
      "Pearls",
      "Chocolate Decor",
      "Butterflies",
      "Candles",
      "Toppers",
    ],
  },

  categoriesPage: {
    eyebrow: "Catalog",
    title: "Categories",
    description:
      "Catalog categories such as kids, wedding, bento and more.",
    emptyTitle:
      "Categories Section Is Ready",
    emptyDescription:
      "Categories are currently stored inside each cake. Separate category management will be added after the core catalog release.",
  },

  fillingsPage: {
    eyebrow: "Catalog",
    title: "Fillings",
    description:
      "Filling names, descriptions, images and additional prices will be managed here.",
    emptyTitle:
      "Fillings Section Is Ready",
    emptyDescription:
      "Full filling management will be added after the main catalog launch.",
  },

  settingsPage: {
    eyebrow: "System",
    title: "Settings",
    description:
      "Store details, contacts, currency and display preferences.",
    emptyTitle:
      "Settings Are Not Needed Yet",
    emptyDescription:
      "For a faster launch, the core settings will remain in the code. A settings interface will be added after the MVP.",
  },
};

export const adminMessages: Record<
  AdminLocale,
  AdminMessages
> = {
  ru,
  en,
};

export type {
  AdminMessages,
};