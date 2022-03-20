<template>
  <div>
    <b-row style="padding: 10px">
      <b-col>
        <b-form-select
          v-model="sortKey"
          :options="sortOptions"
          size="sm"
          style="width: 200px"
        ></b-form-select>
      </b-col>
      <b-col>
        <span class="filter-label">평점 기준</span>
        <b-form-select
          v-model="ratingAvg"
          :options="ratingOptions"
          size="sm"
          style="width: 100px"
        ></b-form-select>
      </b-col>
      <b-col>
        <!-- 제품명 검색(디바운스, 1000ms, 두글자 이상, 앞뒤공백제거되고 두글자이상 -->
        <b-form-input
          v-model="productTitle"
          placeholder="제품명 검색"
        ></b-form-input>
      </b-col>
    </b-row>
    <ul class="list">
      <li
        v-bind:key="product.id"
        v-for="product in products"
        class="list__item"
      >
        <div class="product">
          <img :src="product.imageUrl" class="product__img" />
          <div class="product__details">
            <p class="details__brand">
              {{ product.brand && product.brand.brandTitle }}
            </p>
            <p class="details__product">
              {{ product.productTitle }}
            </p>
            <p class="details__ratings">
              <b-form-rating
                class="rating"
                inline
                :value="product.ratingAvg"
                color="tomato"
                no-border
                size="sm"
                style="padding: 0px; height: 10px"
                readonly
                precision="2"
              >
                ></b-form-rating
              >
              <span class="ratings-value">{{ product.ratingAvg }}</span>
              <span class="ratings-review">{{
                `(리뷰 ${product.reviewCount})`
              }}</span>
            </p>
            <p class="details__volume-price">
              <span>{{
                `${product.volume} / ${Number(product.price).toLocaleString(
                  "ko-KR"
                )}원`
              }}</span>
            </p>
          </div>
        </div>
      </li>
      <infinite-loading
        ref="infiniteLoading"
        @infinite="infiniteHandler"
        spinner="waveDots"
      >
      </infinite-loading>
    </ul>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

const DESC = "DESC";
const ASC = "ASC";
const POSITIVE = "POSITIVE";
const NEGATIVE = "NEGATIVE";

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      allProducts: [],
      products: [],
      limit: 0,
      sortKey: DESC,
      sortOptions: [
        { value: DESC, text: "평점 높은 순" },
        { value: ASC, text: "평점 낮은 순" },
      ],
      ratingAvg: null,
      ratingOptions: [
        { value: null, text: "전체" },
        { value: POSITIVE, text: "긍정적" },
        { value: NEGATIVE, text: "부정적" },
      ],
      productTitle: null,
    };
  },
  async beforeMount() {
    this.allProducts = await this.getProducts();
  },
  watch: {
    async sortKey() {
      this.allProducts = await this.getProducts();
      this.resetProducts();
    },
    async ratingAvg(value) {
      this.allProducts = await this.getProducts();
      this.allProducts = this.allProducts.filter((product) => {
        if (this.ratingAvg !== null) {
          if (value === POSITIVE) {
            return product.ratingAvg >= 3;
          } else if (value === NEGATIVE) {
            return product.ratingAvg < 3;
          }
        }
        return product;
      });
      this.resetProducts();
    },
    productTitle(value) {
      console.log("productTitle", value);
    },
  },
  methods: {
    getProducts() {
      return new Promise((resolve) => {
        const url =
          "https://s3.ap-northeast-2.amazonaws.com/public.glowday.com/test/app/products.json";
        fetch(url)
          .then((res) => res.json())
          .then(({ products }) => {
            const sortedProducts = products.sort((a, b) => {
              if (this.sortKey === DESC) {
                return b.ratingAvg - a.ratingAvg;
              }
              return a.ratingAvg - b.ratingAvg;
            });
            resolve(sortedProducts);
          })
          .catch((e) => {
            console.log("getProducts error! ==> ", e.message);
          });
      });
    },
    infiniteHandler($state) {
      const _allProducts = this.allProducts;
      if (_allProducts.length > 0 && _allProducts.length === this.limit) {
        $state.complete();
      } else {
        setTimeout(() => {
          let newLimit = this.limit + 10;
          if (newLimit > _allProducts.length) {
            newLimit = _allProducts.length;
          }
          const data = _allProducts.slice(this.limit, newLimit);
          this.limit = newLimit;
          this.products = this.products.concat(data);
          $state.loaded();
        }, 1000);
      }
    },
    resetProducts() {
      this.limit = 0;
      this.products = [];
      this.$refs.infiniteLoading.stateChanger.reset();
    },
    filterProducts() {
      console.log("filterProducts");
    },
    // replaceByDefault(e) {
    //   e.target.src = "images/empty.jpg";
    // },
  },
};
</script>

<style>
.list {
  list-style: none;
}
.list__item {
  margin: 0 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f6f7fa;
}
.product {
  display: grid;
  width: 100%;
  grid-template-columns: auto minmax(calc(100% - 400px), calc(100% - 74px));
  grid-column-gap: 14px;
  -moz-column-gap: 14px;
  column-gap: 14px;
}
.product__img {
  width: 250px;
  height: 250px;
}
.product__details {
  display: flex;
  flex-direction: column;
  align-self: center;
}
.details__brand {
  margin-bottom: 3px;
  font-size: 12px;
  line-height: 17px;
  color: #6f6f6f;
}
.details__product {
  font-size: 14px;
  line-height: 20px;
  color: #000;
  word-break: break-all;
}
.details__ratings {
  font-size: 12px;
  line-height: 14px;
  color: #8b8b8b;
}
.ratings-value {
  position: relative;
  margin-right: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
}
.ratings-review {
  font-size: 12px;
  line-height: 14px;
  color: #4d4d4d;
}
.details__volume-price {
  font-size: 12px;
  line-height: 14px;
  color: #8b8b8b;
}
.rating {
  padding: 0;
}
.filter-label {
  margin-right: 5px;
}
</style>
